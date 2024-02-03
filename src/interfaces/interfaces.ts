export interface IDataItem {
    host: string;
    datetime: {
        day: string;
        hour: string;
        minute: string;
        second: string;
    };
    request: {
        method: string;
        url: string;
        protocol: string;
        protocol_version: string;
    },
    response_code: string;
    document_size: string;
}

export interface IChart {
    data: IDataItem[]
}