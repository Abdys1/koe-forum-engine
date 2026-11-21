import { createAuthenticatedApiClient } from "@/lib/api/client/authenticated-api-client";
import EquipmentClientImpl from "@/lib/api/equipment/equipment.client";
import { EquipmentClient } from "@/lib/api/equipment/types";

const equipmentClient: EquipmentClient = new EquipmentClientImpl(createAuthenticatedApiClient());

export { equipmentClient };
