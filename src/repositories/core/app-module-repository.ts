import {
  GetListAppModulesParams,
  ListAppModulesResult,
} from "@/entities/core/app-module-entity";
import type { DatabaseConnection } from "@/lib/database/db";
import { jsonArrayFrom } from "kysely/helpers/postgres";
import { singleton } from "tsyringe";

@singleton()
export default class AppModuleRepository {
  protected db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  async findMany(
    params: GetListAppModulesParams
  ): Promise<ListAppModulesResult> {
    const offset = (Number(params.page) - 1) * Number(params.pageSize);

    const query = this.db
      .selectFrom("appModules")
      .$if(params.search !== undefined && params.search !== "", (eb) =>
        eb.where((whereQuery) =>
          whereQuery.or([
            whereQuery("appModules.name", "ilike", `%${params.search}%`),
            whereQuery("appModules.defaultUrl", "ilike", `%${params.search}%`),
          ])
        )
      );

    const totalData = await query
      .select((eb) => eb.fn.count("appModules.id").as("totalData"))
      .executeTakeFirst();

    const data = await query
      .select((eb) => [
        "appModules.id",
        "appModules.name",
        "appModules.defaultUrl",
        "appModules.createdAt",
        jsonArrayFrom(
          eb
            .selectFrom("featureModules")
            .select([
              "featureModules.id",
              "featureModules.name",
              "featureModules.defaultUrl",
              "featureModules.createdAt",
              "featureModules.appModuleId",
            ])
        ).as("featureModules"),
      ])
      .limit(params.pageSize)
      .offset(offset)
      .execute();

    return {
      data: data ?? [],
      totalData: Number(totalData?.totalData ?? 0),
    };
  }
}
