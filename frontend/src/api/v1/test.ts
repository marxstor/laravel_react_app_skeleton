import api from "./api-service";

export interface TestResponse {
    message: "string";
}

export const getTest = async (): Promise<TestResponse> => {
    const response = await api.get<TestResponse>("/test");
    return response.data;
}
