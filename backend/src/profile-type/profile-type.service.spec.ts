import { Test, TestingModule } from "@nestjs/testing";
import { ProfileTypeService } from "./profile-type.service";

describe("ProfileTypeService", () => {
  let service: ProfileTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileTypeService],
    }).compile();

    service = module.get<ProfileTypeService>(ProfileTypeService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
