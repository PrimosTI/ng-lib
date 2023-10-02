/* tslint:disable:no-unused-variable */
import { TestBed } from "@angular/core/testing";
import { Component } from "@angular/core";
import { ClaimPipe, ClaimPipeModule } from "./claim.pipe";
import { UserPrincipal } from "./user-principal.model";

@Component({
  template: '{{ user | claim:claim }}'
})
class TestComponent {
  user: UserPrincipal = UserPrincipal.anonymous();
  claim: string = '';
}

class TestingUserPrincipal extends UserPrincipal {
  constructor(claims: { type: string, value: string }[] = []) {
    super(claims);
  }

  get isAuthenticated() {
    return true;
  }
}

describe("ClaimPipe", () => {
  var user = new TestingUserPrincipal([
    { type: 'name', value: 'John Doe' },
    { type: 'email', value: 'john.doe@example.com' },
    { type: 'role', value: 'admin' },
    { type: 'role', value: 'manager' },
    { type: 'role', value: 'everyone' },
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClaimPipeModule
      ],
      declarations: [
        TestComponent
      ],
    })
    .compileComponents();
  });

  it("create instance", () => {
    const pipe = new ClaimPipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform to undefined if user is null or undefined', () => {
    const pipe = new ClaimPipe();
    expect(pipe.transform(null, 'unknown')).toBeUndefined();
    expect(pipe.transform(undefined, 'unknown')).toBeUndefined();
  });

  it('should transform to first claim of a type', () => {
      const pipe = new ClaimPipe();
      expect(pipe.transform(user, 'name')).toBe('John Doe');
      expect(pipe.transform(user, 'email')).toBe('john.doe@example.com');
      expect(pipe.transform(user, 'role')).toBe('admin');
  });

  it('should transform to undefined if claim is not found', () => {
    const pipe = new ClaimPipe();
    expect(pipe.transform(user, 'unknown')).toBeUndefined();
  });

  it('should transform parameter on component', () => {
    const fixture = TestBed.createComponent(TestComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();

    component.user = user;

    component.claim = 'name';
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.innerHTML).toBe('John Doe');

    component.claim = 'email';
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.innerHTML).toBe('john.doe@example.com');

    component.claim = 'role';
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.innerHTML).toBe('admin');
  });
});
