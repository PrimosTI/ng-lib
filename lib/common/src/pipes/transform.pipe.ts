import { NgModule, Pipe, PipeTransform } from '@angular/core';

/**
 * Tansforms a value using a function passed as parameter.
 * The function is called with the value as first parameter and the rest of the parameters are passed as is.
 */
@Pipe({ name: 'transform' })
export class TransformPipe implements PipeTransform {

  transform<TIn, TOut, TArgs extends any[]>(value: TIn, transformer: (value: TIn, ...args: TArgs) => TOut, ...args: TArgs): TOut {
    return transformer(value, ...args);
  }

}

@NgModule({
  exports: [TransformPipe],
  declarations: [TransformPipe],
})
export class TransformPipeModule { }
