import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TypeInvoice } from './type-invoice.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TypeInvoice>;

@Injectable()
export class TypeInvoiceService {

    private resourceUrl =  SERVER_API_URL + 'api/type-invoices';

    constructor(private http: HttpClient) { }

    create(typeInvoice: TypeInvoice): Observable<EntityResponseType> {
        const copy = this.convert(typeInvoice);
        return this.http.post<TypeInvoice>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(typeInvoice: TypeInvoice): Observable<EntityResponseType> {
        const copy = this.convert(typeInvoice);
        return this.http.put<TypeInvoice>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TypeInvoice>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TypeInvoice[]>> {
        const options = createRequestOption(req);
        return this.http.get<TypeInvoice[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TypeInvoice[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TypeInvoice = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TypeInvoice[]>): HttpResponse<TypeInvoice[]> {
        const jsonResponse: TypeInvoice[] = res.body;
        const body: TypeInvoice[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TypeInvoice.
     */
    private convertItemFromServer(typeInvoice: TypeInvoice): TypeInvoice {
        const copy: TypeInvoice = Object.assign({}, typeInvoice);
        return copy;
    }

    /**
     * Convert a TypeInvoice to a JSON which can be sent to the server.
     */
    private convert(typeInvoice: TypeInvoice): TypeInvoice {
        const copy: TypeInvoice = Object.assign({}, typeInvoice);
        return copy;
    }
}
