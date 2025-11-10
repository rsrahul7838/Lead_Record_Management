import React from "react";
import { usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

export default function Board() {
  const { tasks = [] } = usePage().props;

  // Group tasks by status
  const columns = {
    Pending: tasks.filter((t) => t.status === "Pending"),
    "In Progress": tasks.filter((t) => t.status === "In Progress"),
    Completed: tasks.filter((t) => t.status === "Completed"),
  };

  // Handle drag event
  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || destination.droppableId === source.droppableId) return;

    router.post(
      route("tasks.updateStatus"),
      { id: draggableId, status: destination.droppableId },
      {
        preserveScroll: true,
        onSuccess: () => console.log("✅ Task moved successfully!"),
      }
    );
  };

  // Generate avatar initials
  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.split(" ");
    return parts.length > 1
      ? parts[0][0] + parts[1][0]
      : parts[0].charAt(0);
  };

  // Column header colors
  const columnColors = {
    Pending: "bg-yellow-500 text-white",
    "In Progress": "bg-blue-600 text-white",
    Completed: "bg-green-600 text-white",
  };

  return (
    <AuthenticatedLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">
          🧩 Task Board (Kanban View)
        </h1>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(columns).map(([status, tasks]) => (
              <Droppable key={status} droppableId={status}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`rounded-xl border dark:border-gray-700 shadow-md flex flex-col transition-all duration-300 ${
                      snapshot.isDraggingOver
                        ? "bg-blue-50 dark:bg-gray-700"
                        : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    {/* Column Header */}
                    <div
                      className={`text-center py-3 font-semibold text-lg rounded-t-xl ${columnColors[status]}`}
                    >
                      {status}
                    </div>

                    <div className="flex-1 p-4 min-h-[300px]">
                      {tasks.map((task, index) => (
                        <Draggable
                          key={task.id.toString()}
                          draggableId={task.id.toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className={`mb-3 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm border transition transform ${
                                snapshot.isDragging
                                  ? "border-blue-500 scale-105 shadow-lg"
                                  : "border-gray-200 dark:border-gray-600"
                              }`}
                            >
                              {/* Title */}
                              <div className="flex justify-between items-center mb-2">
                                <p className="font-medium text-gray-900 dark:text-gray-100">
                                  {task.title}
                                </p>
                                {/* Priority Badge */}
                                <span
                                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                    task.priority === "High"
                                      ? "bg-red-100 text-red-700"
                                      : task.priority === "Medium"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-green-100 text-green-700"
                                  }`}
                                >
                                  {task.priority}
                                </span>
                              </div>

                              {/* Project Name */}
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                📁 {task.project?.name || "—"}
                              </p>

                              {/* Assignee Avatar */}
                              <div className="flex items-center mt-3">
                                <div className="flex items-center space-x-2">
                                  <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm font-semibold">
                                    {getInitials(task.user?.name)}
                                  </div>
                                  <span className="text-sm text-gray-700 dark:text-gray-200">
                                    {task.user?.name || "Unassigned"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </AuthenticatedLayout>
  );
}
