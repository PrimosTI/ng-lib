/* tslint:disable:no-unused-variable */
import { TestBed } from "@angular/core/testing";
import { NULL_TOKEN } from "./null.injection-token";

describe("NULL_TOKEN", () => {

  it('should transform value to string', () => {
    const value: any = TestBed.inject(NULL_TOKEN, false);
    expect(value).toBe(null);
  });

});
