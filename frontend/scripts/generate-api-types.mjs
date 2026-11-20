import { writeFileSync } from "fs";
import openapiTS, { astToString } from "openapi-typescript";
import ts from "typescript";

const BLOB = ts.factory.createTypeReferenceNode(ts.factory.createIdentifier("Blob"));

const ast = await openapiTS(new URL("../../backend/openapi.json", import.meta.url), {
    transform(schemaObject) {
        if (schemaObject.format === "binary") {
            return BLOB;
        }
    }
});

writeFileSync(new URL("../src/lib/api/schema.d.ts", import.meta.url), astToString(ast));
