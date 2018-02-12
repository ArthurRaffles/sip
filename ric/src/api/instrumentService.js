
import { httpApi } from './http';
const baseUrl = 'http://localhost:8999';
export const instrumentApi = {
    getInstruments: () =>
        httpApi.fetch(`${baseUrl}/instruments`,{
                method: 'GET'
            })
            .then(res =>  res.json()),
    saveInstruments: (instruments) => {
        const payload = instruments.map(ric => ({ ric }));
        return httpApi.fetch(`${baseUrl}/instruments/add`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              mode: 'cors',
            body: JSON.stringify(payload),
            method: 'POST'
        })
    }
}
