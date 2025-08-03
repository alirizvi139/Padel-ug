"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IUser } from "../../types/user";

// Mock API functions
const fetchUsers = async (search: string): Promise<IUser[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users?search=${search}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  const data = await response.json();
  return data.data;
};

const addUser = async (user: IUser): Promise<IUser> => {
  console.log("user", user);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    // Try to parse the error body
    const errorBody = await response.json();
    throw errorBody; // This will be caught by React Query
  }

  return response.json();
};

const updateUser = async ({
  user,
  id,
}: {
  user: IUser;
  id: string;
}): Promise<IUser> => {
  console.log("user", user);
  console.log("id", id);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );

  if (!response.ok) {
    // Try to parse the error body
    const errorBody = await response.json();
    throw errorBody; // This will be caught by React Query
  }

  return response.json();
};

const deleteUser = async (id: string): Promise<IUser> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    // Try to parse the error body
    const errorBody = await response.json();
    throw errorBody; // This will be caught by React Query
  }

  return response.json();
};

// Query hook
export function useUsers(search: string= "") {
  return useQuery<IUser[]>({
    queryKey: ["users", search],
    queryFn: () => fetchUsers(search),
  });
}

// Mutation hook
export function useAddUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

// Mutation hook
export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ user, id }: { user: IUser; id: string }) =>
      updateUser({ user, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

// Mutation hook
export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

// Mutation hook
export function useSearchUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (search: string) => fetchUsers(search),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
