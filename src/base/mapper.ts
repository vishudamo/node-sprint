export interface Mapper<Input, Output> {
    mapFrom(param: Input): Output;
    mapTo(param: Output): Input;
}