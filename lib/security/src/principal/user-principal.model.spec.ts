import { UserPrincipal } from "./user-principal.model";

describe("AnonyousUserPrincipal", () => {

  it('should be unauthenticated', () => {
    var anonymous = UserPrincipal.anonymous();
    expect(anonymous.isAuthenticated).toBeFalse();
  });

});

class TestingUserPrincipal extends UserPrincipal {
  constructor(claims: { type: string, value: string }[] = []) {
    super(claims);
  }

  get isAuthenticated() {
    return true;
  }
}

describe("UserPrincipal", () => {

  var user = new TestingUserPrincipal([
    { type: 'name', value: 'John Doe' },
    { type: 'email', value: 'john.doe@example.com' },
    { type: 'role', value: 'admin' },
    { type: 'role', value: 'manager' },
    { type: 'role', value: 'everyone' },
  ]);

  it('should be authenticated', () => {
    expect(user.isAuthenticated).toBeTrue();
  });

  it('should return first claim of a type when finding first claim', () => {
    expect(user.findFirst('name')).toBe('John Doe');
    expect(user.findFirst('email')).toBe('john.doe@example.com');
    expect(user.findFirst('role')).toBe('admin');
  });

  it('should return undefined if claim is not found when finding first claim', () => {
    expect(user.findFirst('unknown')).toBeUndefined();
  });

  it('should return all claims of a type when finding all claims', () => {
    expect(user.findAll('name')).toEqual(['John Doe']);
    expect(user.findAll('email')).toEqual(['john.doe@example.com']);
    expect(user.findAll('role')).toEqual(['admin', 'manager', 'everyone']);
  });

  it('should return empty array if claim is not found when finding all claims', () => {
    expect(user.findAll('unknown')).toEqual([]);
  });

  it('should return true if claim is included', () => {
    expect(user.includes('name', 'John Doe')).toBeTrue();
    expect(user.includes('email', 'john.doe@example.com')).toBeTrue();
    expect(user.includes('role', 'admin')).toBeTrue();
    expect(user.includes('role', 'manager')).toBeTrue();
    expect(user.includes('role', 'everyone')).toBeTrue();
    expect(user.includes('role', 'boss')).toBeFalse();
  });

  it('should return false if claim is not included', () => {
    expect(user.includes('role', 'bos')).toBeFalse();
  });

});
