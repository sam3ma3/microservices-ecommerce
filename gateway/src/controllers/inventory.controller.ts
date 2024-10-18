import {Body, Controller, Inject, Post} from "@nestjs/common";
import {ApiBody} from "@nestjs/swagger";
import {ClientKafka} from "@nestjs/microservices";
import {InventoryDto} from "../entities/dtos/inventory.dto";
import {InventoryService} from "../services/inventory.service";

@Controller('inventory')
export class InventoryController {
    constructor(@Inject() private inventoryService: InventoryService, @Inject('GATEWAY_SERVICE') private readonly client: ClientKafka) {
    }

    @Post()
    @ApiBody({
        type: InventoryDto
    })
    async createInventory(@Body() req: InventoryDto) {
        return await this.inventoryService.createInventory(req);
    }

    onModuleInit() {
        this.client.subscribeToResponseOf('inventory_create');

    }
}