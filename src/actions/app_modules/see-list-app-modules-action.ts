import {
  GetListAppModulesParams,
  ListAppModulesResult,
} from "@/entities/core/app-module-entity";
import AppModuleRepository from "@/repositories/core/AppModuleRepository";
import { container } from "tsyringe";

export default function seeListAppModulesAction(
  params: GetListAppModulesParams
): PromiseLike<ListAppModulesResult> {
  const repository = container.resolve(AppModuleRepository);
  return repository.findMany(params);
}
