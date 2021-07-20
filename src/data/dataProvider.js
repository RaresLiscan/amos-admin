import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';


const apiUrl = 'https://api.amosed.ro/api';
let httpClient = ((url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: "application/json" });
    }
    console.log(options);
    options.headers['Content-Type'] = "application/json";
    // options.headers.set("Content-Type", "application/json");
    return fetchUtils.fetchJson(url, options);
});

export default {
    getList: (resource, params) => {

        console.log(params);

        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => {
            return ({
                data: json,
                total: json.length,
            })
        });
    },

    getOne: (resource, params) => {
        return httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
            data: json,
        }));
    },

    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: json.length,
        }));
    },

    update: (resource, params) => {
        return httpClient(`${apiUrl}/${resource}/update/`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => {
            return { data: json }
        });
    },

    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    create: (resource, params) => {
        return fetch(`${apiUrl}/${resource}/add`, {
            method: "POST",
            body: JSON.stringify(params.data),
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors"
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                return {
                    data: { ...params.data, id: json.id },
                }
            })
            .catch(error => console.log(error));
    },

    delete: (resource, params) => {
        return fetch(`${apiUrl}/${resource}/${params.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
        }).then(response=>response.json())
        .then(json => ({data: json}))
        .catch(error => console.log(error));
    },

    deleteMany: (resource, params) => {
        return httpClient(`${apiUrl}/${resource}`, {
            method: 'DELETE',
            body: JSON.stringify(params),
        }).then(({ json }) => ({ data: json })).catch(error=>console.log(error));
    }
};