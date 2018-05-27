import { SharedServicesModule } from './shared-services.module';

describe('SharedServicesModule', () => {
  let sharedServicesModule: SharedServicesModule;

  beforeEach(() => {
    sharedServicesModule = new SharedServicesModule();
  });

  it('should create an instance', () => {
    expect(sharedServicesModule).toBeTruthy();
  });
});
