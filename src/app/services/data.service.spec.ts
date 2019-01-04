import { TestBed, inject } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestModule } from '../../test.module';
import { DataService } from './data.service';

describe('DataService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let dataService: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [DataService]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    dataService = TestBed.get(DataService);
  });

  afterEach(() => {
    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  });

  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));

  it('should make a get request', () => {

    dataService.get('dummy/get', { data: 12 }, true).subscribe(data => {
      // When observable resolves, result should match test data
      expect(data).toEqual({ testData: [] });
      expect(httpClient.get).toHaveBeenCalledTimes(1);
    });

    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const req = httpTestingController.expectOne('dummy/get?data=12');
    expect(req.request.method).toBe('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush({ testData: [] });
  });

  it('should make a get call without params', () => {
    dataService.get('dummy/get', {}).subscribe(
      data => {
        expect(data).toEqual({ testData: [] });
      });

    const req = httpTestingController.expectOne('dummy/get');
    expect(req.request.method).toEqual('GET');
    req.flush({ testData: [] });
  });

  it('should do a get call with error', () => {
    dataService.get('dummy/get', {}).subscribe(
      data => { },
      error => {
        expect(error).toEqual('Error:Http failure response for dummy/get: 0 ');
      });
    const req = httpTestingController.expectOne('dummy/get');
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent(''));
  });

  it('should do a get call with error 404', () => {debugger;
    const emsg = 'deliberate 404 error';

    dataService.get('dummy/get', {}).subscribe(
      data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error).toEqual('Error:Http failure response for dummy/get: 404 Not Found');
        // expect(error.status).toEqual(404, 'status');
        // expect(error.error).toEqual(emsg, 'message');
      });
    const req = httpTestingController.expectOne('dummy/get');
    expect(req.request.method).toBe('GET');
    req.flush(emsg, { status: 404, statusText: 'Not Found'});    
  });

  it('should do post call', () => {
    dataService.post('dummy/post', {}, true).subscribe(val => {
      expect(val).toEqual({ testData: [] });
    });
    const req = httpTestingController.expectOne('dummy/post');
    expect(req.request.method).toBe('POST');
    req.flush({ testData: [] });
  });
});
