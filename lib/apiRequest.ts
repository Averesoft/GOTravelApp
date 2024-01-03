export default function apiRequest(endpoint: string, body: string, method: string): Promise<ApiResponse> {
    return new Promise((resolve, reject) => {
        fetch('http://api.openmetrolinx.com/OpenDataAPI/${endpoint}?key=${process.env.key.local.GOTRANSIT_KEY}',  {
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