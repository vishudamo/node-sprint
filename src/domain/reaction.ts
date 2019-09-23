export interface Reaction {
    id: string | null;
    userId: string;
    like: boolean;
    dislike: boolean;
    informative: boolean;
    confused: boolean;
    applause: boolean;
}