import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function Chat({ leadId, user }) {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const bottomRef = useRef();

    useEffect(() => {
        axios.get(route("messages.index", leadId)).then((res) => {
            setMessages(res.data);
        });

        window.Echo.private(`lead.${leadId}`)
            .listen(".NewMessage", (e) => {
                setMessages((prev) => [...prev, e.data]);
                scrollDown();
            });

        return () => {
            window.Echo.leave(`lead.${leadId}`);
        };
    }, []);

    const scrollDown = () => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        axios
            .post(route("messages.store", leadId), { message: text })
            .then((res) => {
                setMessages((prev) => [...prev, res.data]);
                setText("");
                scrollDown();
            });
    };

    return (
        <div className="border rounded p-4 bg-white shadow max-w-xl">
            <div className="h-80 overflow-y-scroll space-y-3 mb-3 p-3 border">
                {messages.map((m) => (
                    <div
                        key={m.id}
                        className={
                            m.user.id === user.id
                                ? "text-right"
                                : "text-left"
                        }
                    >
                        <strong>{m.user.name}</strong>
                        <div
                            className={`inline-block px-3 py-2 rounded mt-1 ${
                                m.user.id === user.id
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200"
                            }`}
                        >
                            {m.message}
                        </div>
                    </div>
                ))}
                <div ref={bottomRef}></div>
            </div>

            <form onSubmit={sendMessage} className="flex gap-2">
                <input
                    className="flex-1 border rounded px-3 py-2"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type message..."
                />
                <button className="bg-blue-600 text-white px-4 rounded">
                    Send
                </button>
            </form>
        </div>
    );
}
