import { App } from 'vue'
import { InjectionKey } from 'vue'
import { inject } from 'vue'
import { reactive } from 'vue'

type ServiceConstructor<TService extends Object> = { new() : TService }

class ServiceManager {

  get<TService extends Object>(key: InjectionKey<TService>, constructor: ServiceConstructor<TService>) : TService {
    // Typescript has a weird stuff going around symbols as indexers, so the workarounds
    if((key as symbol) in this._services) {
      let service = this._services[key as any]
      return service as TService
    }

    let service = reactive(new constructor()) as TService
    this._services[key as any] = service
    return service
  }

  private _services: Record<any, Object> = {}
}

const ServiceManagerKey : InjectionKey<ServiceManager> = 'ServiceManager' as any as InjectionKey<ServiceManager>

// HACK to workaround injection bug when running in production
const ServiceManagerInstance = new ServiceManager()

export function getService<TService extends Object>(key: InjectionKey<TService>, constructor: ServiceConstructor<TService>) {
  // HACK to workaround injection bug when running in production
  const manager = ServiceManagerInstance
  if(!manager) {
    throw new Error("No service manager available, please install it in Vue JS application through the service-manager.ts/install method")
  }

  return manager.get(key, constructor)
}

export function installServiceManager<T>(app: App<T>) {
  app.provide(ServiceManagerKey, ServiceManagerInstance)
}
