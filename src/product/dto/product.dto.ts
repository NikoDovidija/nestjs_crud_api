import { ApiModelProperty } from '@nestjs/swagger';

/*
The data-transfer-object used to unpack atributes and values 
from incoming request 
*/

export class ProductDTO {
    @ApiModelProperty()
    readonly name: string;
    @ApiModelProperty()
    readonly price: number;
    @ApiModelProperty()
    readonly available: boolean;
}