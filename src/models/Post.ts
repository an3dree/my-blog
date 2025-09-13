import { User } from "./User";

export interface Post {
    id: string;
    title: string;
    content: string;
    createdBy: string;
    createdAt: Date;
    tags: string[];
}