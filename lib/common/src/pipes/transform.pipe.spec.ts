/* tslint:disable:no-unused-variable */
import { TestBed } from "@angular/core/testing";
import { Component } from "@angular/core";
import { TransformPipe, TransformPipeModule } from "./transform.pipe";

@Component({
  template: '{{ value | transform:fn:param }}'
})
class TestComponent {
  value: any;
  param: any;

  fn: (value: any, param: any) => any = (x) => String(x);
}

describe("TransformPipe", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TransformPipeModule
      ],
      declarations: [
        TestComponent
      ],
    })
    .compileComponents();
  });

  it("create instance", () => {
    const pipe = new TransformPipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform value to string', () => {
      const pipe = new TransformPipe();
      const fn = ((v: any) => String(v));

      expect(pipe.transform(null, fn)).toBe('null');
      expect(pipe.transform(undefined, fn)).toBe('undefined');
      expect(pipe.transform(0, fn)).toBe('0');
      expect(pipe.transform(1, fn)).toBe('1');
  });

  it('should transform parameter to string', () => {
      const pipe = new TransformPipe();
      const fn = ((_: any, param: any) => String(param));

      expect(pipe.transform(0, fn, null)).toBe('null');
      expect(pipe.transform(0, fn, undefined)).toBe('undefined');
      expect(pipe.transform(0, fn, 0)).toBe('0');
      expect(pipe.transform(0, fn, 1)).toBe('1');
  });

  it('should transform value on component', () => {
    const fixture = TestBed.createComponent(TestComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();

    component.value = null;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.innerHTML).toBe('null');

    component.value = undefined;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.innerHTML).toBe('undefined');

    component.value = 0;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.innerHTML).toBe('0');
  });

  it('should transform parameter on component', () => {
    const fixture = TestBed.createComponent(TestComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();

    component.fn = ((_: any, param: any) => String(param));

    component.param = null;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.innerHTML).toBe('null');

    component.param = undefined;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.innerHTML).toBe('undefined');

    component.param = 0;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.innerHTML).toBe('0');
  });
});
