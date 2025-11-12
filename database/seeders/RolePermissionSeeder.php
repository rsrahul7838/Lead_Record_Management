<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Define roles
        $roles = ['Admin', 'Manager', 'Agent','User'];

        // Create roles if not exists
        foreach ($roles as $roleName) {
            Role::firstOrCreate(['name' => $roleName, 'guard_name' => 'web']);
        }

        // Define permissions
        $permissions = [
            'view leads', 'create leads', 'edit leads', 'delete leads',
            'view clients', 'create clients', 'edit clients', 'delete clients',
            'view payments', 'create payments', 'edit payments', 'delete payments',
            'view properties', 'create properties', 'edit properties', 'delete properties',
        ];

        // Create permissions
        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm, 'guard_name' => 'web']);
        }

        // Assign permissions to roles
        $admin = Role::where('name', 'Admin')->first();
        $manager = Role::where('name', 'Manager')->first();
        $agent = Role::where('name', 'Agent')->first();
        $user = Role::where('name', 'User')->first();


        // Admin gets all permissions
        $admin->givePermissionTo(Permission::all());

        // Manager gets limited permissions
        $manager->givePermissionTo([
            'view leads', 'create leads', 'edit leads', 'view clients', 'view properties', 'view payments'
        ]);

        // Agent gets basic permissions
        $agent->givePermissionTo([
            'view leads', 'edit leads', 'view clients', 'view payments'
        ]);

        $user->givePermissionTo(['view leads', 'edit leads', 'view clients', 'view payments']);
    }
}
