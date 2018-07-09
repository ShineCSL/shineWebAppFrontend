import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { InvoiceConfig } from './invoice-config.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<InvoiceConfig>;

@Injectable()
export class InvoiceConfigService {

    private resourceUrl =  SERVER_API_URL + 'api/invoice-configs';

    constructor(private http: HttpClient) { }

    create(invoiceConfig: InvoiceConfig): Observable<EntityResponseType> {
        const copy = this.convert(invoiceConfig);
        return this.http.post<InvoiceConfig>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(invoiceConfig: InvoiceConfig): Observable<EntityResponseType> {
        const copy = this.convert(invoiceConfig);
        return this.http.put<InvoiceConfig>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<InvoiceConfig>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<InvoiceConfig[]>> {
        const options = createRequestOption(req);
        return this.http.get<InvoiceConfig[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<InvoiceConfig[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: InvoiceConfig = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<InvoiceConfig[]>): HttpResponse<InvoiceConfig[]> {
        const jsonResponse: InvoiceConfig[] = res.body;
        const body: InvoiceConfig[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to InvoiceConfig.
     */
    private convertItemFromServer(invoiceConfig: InvoiceConfig): InvoiceConfig {
        const copy: InvoiceConfig = Object.assign({}, invoiceConfig);
        return copy;
    }

    /**
     * Convert a InvoiceConfig to a JSON which can be sent to the server.
     */
    private convert(invoiceConfig: InvoiceConfig): InvoiceConfig {
        const copy: InvoiceConfig = Object.assign({}, invoiceConfig);
        return copy;
    }
}
