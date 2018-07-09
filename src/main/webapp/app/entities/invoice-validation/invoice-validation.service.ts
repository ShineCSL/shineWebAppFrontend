import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { InvoiceValidation } from './invoice-validation.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<InvoiceValidation>;

@Injectable()
export class InvoiceValidationService {

    private resourceUrl =  SERVER_API_URL + 'api/invoice-validations';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(invoiceValidation: InvoiceValidation): Observable<EntityResponseType> {
        const copy = this.convert(invoiceValidation);
        return this.http.post<InvoiceValidation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(invoiceValidation: InvoiceValidation): Observable<EntityResponseType> {
        const copy = this.convert(invoiceValidation);
        return this.http.put<InvoiceValidation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<InvoiceValidation>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<InvoiceValidation[]>> {
        const options = createRequestOption(req);
        return this.http.get<InvoiceValidation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<InvoiceValidation[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: InvoiceValidation = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<InvoiceValidation[]>): HttpResponse<InvoiceValidation[]> {
        const jsonResponse: InvoiceValidation[] = res.body;
        const body: InvoiceValidation[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to InvoiceValidation.
     */
    private convertItemFromServer(invoiceValidation: InvoiceValidation): InvoiceValidation {
        const copy: InvoiceValidation = Object.assign({}, invoiceValidation);
        copy.dateInvoice = this.dateUtils
            .convertLocalDateFromServer(invoiceValidation.dateInvoice);
        return copy;
    }

    /**
     * Convert a InvoiceValidation to a JSON which can be sent to the server.
     */
    private convert(invoiceValidation: InvoiceValidation): InvoiceValidation {
        const copy: InvoiceValidation = Object.assign({}, invoiceValidation);
        copy.dateInvoice = this.dateUtils
            .convertLocalDateToServer(invoiceValidation.dateInvoice);
        return copy;
    }
}
