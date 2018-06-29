import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { InvoiceSubmission } from './invoice-submission.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<InvoiceSubmission>;

@Injectable()
export class InvoiceSubmissionService {

    private resourceUrl =  SERVER_API_URL + 'api/invoice-submissions';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(invoiceSubmission: InvoiceSubmission): Observable<EntityResponseType> {
        const copy = this.convert(invoiceSubmission);
        return this.http.post<InvoiceSubmission>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(invoiceSubmission: InvoiceSubmission): Observable<EntityResponseType> {
        const copy = this.convert(invoiceSubmission);
        return this.http.put<InvoiceSubmission>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<InvoiceSubmission>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<InvoiceSubmission[]>> {
        const options = createRequestOption(req);
        return this.http.get<InvoiceSubmission[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<InvoiceSubmission[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: InvoiceSubmission = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<InvoiceSubmission[]>): HttpResponse<InvoiceSubmission[]> {
        const jsonResponse: InvoiceSubmission[] = res.body;
        const body: InvoiceSubmission[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to InvoiceSubmission.
     */
    private convertItemFromServer(invoiceSubmission: InvoiceSubmission): InvoiceSubmission {
        const copy: InvoiceSubmission = Object.assign({}, invoiceSubmission);
        copy.dateCreation = this.dateUtils
            .convertDateTimeFromServer(invoiceSubmission.dateCreation);
        copy.dateModification = this.dateUtils
            .convertDateTimeFromServer(invoiceSubmission.dateModification);
        return copy;
    }

    /**
     * Convert a InvoiceSubmission to a JSON which can be sent to the server.
     */
    private convert(invoiceSubmission: InvoiceSubmission): InvoiceSubmission {
        const copy: InvoiceSubmission = Object.assign({}, invoiceSubmission);

        copy.dateCreation = this.dateUtils.toDate(invoiceSubmission.dateCreation);

        copy.dateModification = this.dateUtils.toDate(invoiceSubmission.dateModification);
        return copy;
    }
}
