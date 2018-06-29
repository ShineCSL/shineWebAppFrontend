import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ActivityValidation } from './activity-validation.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ActivityValidation>;

@Injectable()
export class ActivityValidationService {

    private resourceUrl =  SERVER_API_URL + 'api/activity-validations';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(activityValidation: ActivityValidation): Observable<EntityResponseType> {
        const copy = this.convert(activityValidation);
        return this.http.post<ActivityValidation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(activityValidation: ActivityValidation): Observable<EntityResponseType> {
        const copy = this.convert(activityValidation);
        return this.http.put<ActivityValidation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ActivityValidation>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ActivityValidation[]>> {
        const options = createRequestOption(req);
        return this.http.get<ActivityValidation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ActivityValidation[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ActivityValidation = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ActivityValidation[]>): HttpResponse<ActivityValidation[]> {
        const jsonResponse: ActivityValidation[] = res.body;
        const body: ActivityValidation[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ActivityValidation.
     */
    private convertItemFromServer(activityValidation: ActivityValidation): ActivityValidation {
        const copy: ActivityValidation = Object.assign({}, activityValidation);
        copy.dateCreation = this.dateUtils
            .convertDateTimeFromServer(activityValidation.dateCreation);
        copy.dateModification = this.dateUtils
            .convertDateTimeFromServer(activityValidation.dateModification);
        return copy;
    }

    /**
     * Convert a ActivityValidation to a JSON which can be sent to the server.
     */
    private convert(activityValidation: ActivityValidation): ActivityValidation {
        const copy: ActivityValidation = Object.assign({}, activityValidation);

        copy.dateCreation = this.dateUtils.toDate(activityValidation.dateCreation);

        copy.dateModification = this.dateUtils.toDate(activityValidation.dateModification);
        return copy;
    }
}
