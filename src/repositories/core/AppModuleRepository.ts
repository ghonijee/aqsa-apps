import {
  GetListAppModulesParams,
  ListAppModulesResult,
} from "@/entities/core/app-module-entity";

export default class AppModuleRepository {
  findMany(params: GetListAppModulesParams): PromiseLike<ListAppModulesResult> {
    throw new Error("Function not implemented.");
  }
}
