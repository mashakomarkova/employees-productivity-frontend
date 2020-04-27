class PositionService {

    constructor(allPositionsApi, token) {
        this.allPositionsApi = allPositionsApi;
        this.token = token;
    }

    viewAllPosition() {
        return fetch(`${this.allPositionsApi}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.token
            }
        }).then((response) => response.json())
    }

}

export default PositionService;