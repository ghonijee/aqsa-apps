import { DatabaseConnection } from "@/lib/database/db";
import AppModuleRepository from "@/repositories/core/app-module-repository";
import { QueryCreator } from "kysely";

describe("App Module Repository", () => {
  const db = {} as DatabaseConnection;

  let appModuleRepository: AppModuleRepository;

  beforeAll(() => {
    appModuleRepository = new AppModuleRepository(db);
  });

  describe("findMany", () => {
    it("params page: 1, pageSize: 10 should return a list of app modules", async () => {
      const mockResult = {
        data: [
          {
            id: 1,
            name: "test",
            defaultUrl: "test",
            created_at: new Date(),
            featureModules: [],
          },
        ],
        totalData: 3,
      };

      const result = await appModuleRepository.findMany({
        page: 1,
        pageSize: 10,
      });
      expect(result.data).toHaveLength(1);
      expect(result.totalData).toBe(3);
    });

    it("params with search should return a list of app modules", async () => {
      const result = await appModuleRepository.findMany({
        page: 1,
        pageSize: 10,
        search: "test",
      });
      expect(result.data).toHaveLength(1);
      expect(result.totalData).toBe(3);
    });
  });
});
