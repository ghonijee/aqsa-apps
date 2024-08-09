// import { GetListAppModulesParams } from "@/entities/core/app-module-entity";
// import { container } from "tsyringe";
// import seeListAppModulesAction from "./see-list-app-modules-action";
// import AppModuleRepository from "../../repositories/core/app-module-repository";

// describe("See list app modules action", () => {
//   const appModuleRepository: AppModuleRepository = {} as AppModuleRepository;

//   beforeAll(() => {
//     container.register<AppModuleRepository>(AppModuleRepository, {
//       useValue: appModuleRepository,
//     });
//   });

//   it("should return a list of app modules", async () => {
//     appModuleRepository.findMany = jest.fn().mockResolvedValue({
//       data: [
//         {
//           id: 1,
//           name: "test",
//           defaultUrl: "test",
//           created_at: new Date(),
//           featureModules: [],
//         },
//       ],
//       totalData: 3,
//     });
//     const params: GetListAppModulesParams = {
//       page: 1,
//       pageSize: 10,
//     };
//     const { data, totalData } = await seeListAppModulesAction(params);
//     expect(totalData).toBe(3);
//     expect(data).toHaveLength(1);
//   });

//   it("should return a empty list of app modules", async () => {
//     appModuleRepository.findMany = jest.fn().mockResolvedValue({
//       data: [],
//       totalData: 0,
//     });
//     const params: GetListAppModulesParams = {
//       page: 1,
//       pageSize: 10,
//     };
//     const { data, totalData } = await seeListAppModulesAction(params);
//     expect(totalData).toBe(0);
//     expect(data).toHaveLength(0);
//   });
// });
