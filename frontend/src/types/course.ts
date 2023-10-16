export interface Course {
    _id: string;
    name: string;
    image: string;
    language_id: string;
    description: string;
    updated_at: string;
    created_at: string;
    level_ids?: string[];
}
