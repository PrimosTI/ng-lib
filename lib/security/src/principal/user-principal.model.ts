export type UserClaim = { type: string, value: string };

export abstract class UserPrincipal {

  private readonly claims: Record<string, string[]>;

  constructor(claims: UserClaim[] = []) {
    this.claims = claims?.reduce((acc, claim) => {
      acc[claim.type] = acc[claim.type] || [];
      acc[claim.type].push(claim.value);
      return acc;
    }, {} as Record<string, string[]>);
  }

  static anonymous(): UserPrincipal {
    return new AnonymousUserPrincipal();
  }

  abstract get isAuthenticated(): boolean;

  findAll(claim: string) {
    return this.claims?.[claim] || [];
  }

  findFirst(claim: string): string | undefined {
    return this.claims?.[claim]?.[0];
  }

  includes(claim: string, value: string) {
    return !!this.claims?.[claim]?.includes(value);
  }

}

class AnonymousUserPrincipal extends UserPrincipal {

  get isAuthenticated() {
    return false;
  }

}
