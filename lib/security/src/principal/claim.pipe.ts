import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { UserPrincipal } from './user-principal.model';

/**
 * Gets the value of the first claim with the specified name from the user principal.
 * @see UserPrincipal
 */
@Pipe({ name: 'claim' })
export class ClaimPipe implements PipeTransform {

  transform(value: UserPrincipal | null | undefined, claim: string): string | undefined {
    return value?.findFirst(claim);
  }

}

@NgModule({
  declarations: [ ClaimPipe ],
  exports: [ ClaimPipe ]
})
export class ClaimPipeModule { }
