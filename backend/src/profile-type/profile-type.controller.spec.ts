import { Test, TestingModule } from "@nestjs/testing";
import { ProfileTypeController } from "./profile-type.controller";
import { ProfileTypeService } from "./profile-type.service";

describe("ProfileTypeController", () => {
  let controller: ProfileTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileTypeController],
      providers: [ProfileTypeService],
    }).compile();

    controller = module.get<ProfileTypeController>(ProfileTypeController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
