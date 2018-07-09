import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { AccountDetails } from './account-details.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AccountDetails>;

@Injectable()
export class AccountDetailsService {

    private resourceUrl =  SERVER_API_URL + 'api/account-details';

    constructor(private http: HttpClient) { }

    create(accountDetails: AccountDetails): Observable<EntityResponseType> {
        const copy = this.convert(accountDetails);
        return this.http.post<AccountDetails>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(accountDetails: AccountDetails): Observable<EntityResponseType> {
        const copy = this.convert(accountDetails);
        return this.http.put<AccountDetails>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AccountDetails>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AccountDetails[]>> {
        const options = createRequestOption(req);
        return this.http.get<AccountDetails[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AccountDetails[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AccountDetails = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AccountDetails[]>): HttpResponse<AccountDetails[]> {
        const jsonResponse: AccountDetails[] = res.body;
        const body: AccountDetails[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AccountDetails.
     */
    private convertItemFromServer(accountDetails: AccountDetails): AccountDetails {
        const copy: AccountDetails = Object.assign({}, accountDetails);
        return copy;
    }

    /**
     * Convert a AccountDetails to a JSON which can be sent to the server.
     */
    private convert(accountDetails: AccountDetails): AccountDetails {
        const copy: AccountDetails = Object.assign({}, accountDetails);
        return copy;
    }
}
