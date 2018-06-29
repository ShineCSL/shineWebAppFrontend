import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { LeavesSubmission } from './leaves-submission.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<LeavesSubmission>;

@Injectable()
export class LeavesSubmissionService {

    private resourceUrl =  SERVER_API_URL + 'api/leaves-submissions';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(leavesSubmission: LeavesSubmission): Observable<EntityResponseType> {
        const copy = this.convert(leavesSubmission);
        return this.http.post<LeavesSubmission>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(leavesSubmission: LeavesSubmission): Observable<EntityResponseType> {
        const copy = this.convert(leavesSubmission);
        return this.http.put<LeavesSubmission>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<LeavesSubmission>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<LeavesSubmission[]>> {
        const options = createRequestOption(req);
        return this.http.get<LeavesSubmission[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<LeavesSubmission[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: LeavesSubmission = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<LeavesSubmission[]>): HttpResponse<LeavesSubmission[]> {
        const jsonResponse: LeavesSubmission[] = res.body;
        const body: LeavesSubmission[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to LeavesSubmission.
     */
    private convertItemFromServer(leavesSubmission: LeavesSubmission): LeavesSubmission {
        const copy: LeavesSubmission = Object.assign({}, leavesSubmission);
        copy.dateModification = this.dateUtils
            .convertDateTimeFromServer(leavesSubmission.dateModification);
        copy.dateCreation = this.dateUtils
            .convertDateTimeFromServer(leavesSubmission.dateCreation);
        return copy;
    }

    /**
     * Convert a LeavesSubmission to a JSON which can be sent to the server.
     */
    private convert(leavesSubmission: LeavesSubmission): LeavesSubmission {
        const copy: LeavesSubmission = Object.assign({}, leavesSubmission);

        copy.dateModification = this.dateUtils.toDate(leavesSubmission.dateModification);

        copy.dateCreation = this.dateUtils.toDate(leavesSubmission.dateCreation);
        return copy;
    }
}
