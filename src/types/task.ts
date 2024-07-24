export interface TaskType {
    id: number,
    slug: string,
    title: string,
    description: string,
    created_at: string,
    taskList: [
        {
            id: number,
            name: string,
            checked: boolean
        }
    ]
}