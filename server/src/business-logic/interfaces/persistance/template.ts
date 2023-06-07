

export interface TemplateDAO {
    create(name: string, userId: number, field: {variable: string, value: string}[]): void;
    delete(): void;
    getAllByUser(userId: number): void;
}