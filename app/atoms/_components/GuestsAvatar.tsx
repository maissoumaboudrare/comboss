"use client";
import { useState, useEffect, useCallback } from "react";
import Image from 'next/image';
import { fetchUsers } from "@/utils/api";
import { User } from "@/types/user";

type GuestsAvatarProps = {
  userIds: number[];
};

const GuestsAvatar = ({ userIds }: GuestsAvatarProps) => {
  const [users, setUsers] = useState<User[]>([]);

  const loadUsers = useCallback(async () => {
    try {
      const data = await fetchUsers();
      const filteredUsers = data.filter((user: User) =>
        userIds.includes(user.userID)
      );
      setUsers(filteredUsers.slice(0, 6));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [userIds]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return (
    <div className="flex items-center justify-center mb-10 w-full pr-2">
      <div className="flex items-center">
      {users.map((user) => (
        <div key={user.userID} className="relative group -mr-4">
          <Image
            height={48}
            width={48}
            src={user.avatar}
            alt={user.pseudo}
            className="object-cover rounded-full h-12 w-12 border-2 border-white transition duration-500 group-hover:scale-105 group-hover:z-30"
          />
        </div>
      ))}
      </div>
    </div>
  );
}

export default GuestsAvatar;