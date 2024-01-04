import Config from "react-native-config";
export default function apiRequest(endpoint: string, body: string, method: string): Promise<ApiResponse> {
    return new Promise((resolve, reject) => {
        const key = Config.GOTRANSIT_API_KEY;
        console.log(key);
        console.log(`http://api.openmetrolinx.com/OpenDataAPI/${endpoint}?key=${key}`);
        fetch(`http://api.openmetrolinx.com/OpenDataAPI/${endpoint}?key=${key}`,  {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        }).then((response) => response.text())
            .then((text) => {
                resolve(new ApiResponse(true, text, ''));
            }).catch(err => resolve(new ApiResponse(false, '', 'API error')));
    })
}

class ApiResponse {
    success: boolean;
    response: string;
    error: string;
    constructor(success: boolean, response: string, error: string) {
        this.success = success;
        this.response = response;
        this.error = error;
    }
}