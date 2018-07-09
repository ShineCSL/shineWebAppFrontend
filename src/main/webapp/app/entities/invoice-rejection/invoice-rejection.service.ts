import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { InvoiceRejection } from './invoice-rejection.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<InvoiceRejection>;

@Injectable()
export class InvoiceRejectionService {

    private resourceUrl =  SERVER_API_URL + 'api/invoice-rejections';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(invoiceRejection: InvoiceRejection): Observable<EntityResponseType> {
        const copy = this.convert(invoiceRejection);
        return this.http.post<InvoiceRejection>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(invoiceRejection: InvoiceRejection): Observable<EntityResponseType> {
        const copy = this.convert(invoiceRejection);
        return this.http.put<InvoiceRejection>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<InvoiceRejection>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<InvoiceRejection[]>> {
        const options = createRequestOption(req);
        return this.http.get<InvoiceRejection[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<InvoiceRejection[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: InvoiceRejection = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<InvoiceRejection[]>): HttpResponse<InvoiceRejection[]> {
        const jsonResponse: InvoiceRejection[] = res.body;
        const body: InvoiceRejection[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to InvoiceRejection.
     */
    private convertItemFromServer(invoiceRejection: InvoiceRejection): InvoiceRejection {
        const copy: InvoiceRejection = Object.assign({}, invoiceRejection);
        copy.dateInvoice = this.dateUtils
            .convertLocalDateFromServer(invoiceRejection.dateInvoice);
        return copy;
    }

    /**
     * Convert a InvoiceRejection to a JSON which can be sent to the server.
     */
    private convert(invoiceRejection: InvoiceRejection): InvoiceRejection {
        const copy: InvoiceRejection = Object.assign({}, invoiceRejection);
        copy.dateInvoice = this.dateUtils
            .convertLocalDateToServer(invoiceRejection.dateInvoice);
        return copy;
    }
}
