import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ActivitySubmission } from './activity-submission.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ActivitySubmission>;

@Injectable()
export class ActivitySubmissionService {

    private resourceUrl =  SERVER_API_URL + 'api/activity-submissions';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(activitySubmission: ActivitySubmission): Observable<EntityResponseType> {
        const copy = this.convert(activitySubmission);
        return this.http.post<ActivitySubmission>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(activitySubmission: ActivitySubmission): Observable<EntityResponseType> {
        const copy = this.convert(activitySubmission);
        return this.http.put<ActivitySubmission>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ActivitySubmission>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ActivitySubmission[]>> {
        const options = createRequestOption(req);
        return this.http.get<ActivitySubmission[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ActivitySubmission[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ActivitySubmission = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ActivitySubmission[]>): HttpResponse<ActivitySubmission[]> {
        const jsonResponse: ActivitySubmission[] = res.body;
        const body: ActivitySubmission[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ActivitySubmission.
     */
    private convertItemFromServer(activitySubmission: ActivitySubmission): ActivitySubmission {
        const copy: ActivitySubmission = Object.assign({}, activitySubmission);
        copy.dateCreation = this.dateUtils
            .convertDateTimeFromServer(activitySubmission.dateCreation);
        copy.dateModification = this.dateUtils
            .convertDateTimeFromServer(activitySubmission.dateModification);
        return copy;
    }

    /**
     * Convert a ActivitySubmission to a JSON which can be sent to the server.
     */
    private convert(activitySubmission: ActivitySubmission): ActivitySubmission {
        const copy: ActivitySubmission = Object.assign({}, activitySubmission);

        copy.dateCreation = this.dateUtils.toDate(activitySubmission.dateCreation);

        copy.dateModification = this.dateUtils.toDate(activitySubmission.dateModification);
        return copy;
    }
}
