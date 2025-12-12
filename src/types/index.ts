
export interface Difficulty {
    id: number;
    name: string;
    effort_points: number;
}

export interface Task {
    id: number;
    project_id: number;
    title: string;
    completed: boolean;
    difficulty_id: number;
    difficulty: Difficulty;
}

export interface Project {
    id: number;
    name: string;
    progress: number; 
    tasks: Task[];
}