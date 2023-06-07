import Docxtemplater, { DXT } from "docxtemplater";
import PizZip, { LoadOptions } from "pizzip";
import ConstructorOptions = DXT.ConstructorOptions;

interface Factory {
  createZip(content?: any, options?: any): any;
  createDocx(content?: any, options?: any): any;
}

class ConcreteFactory implements Factory {
  createZip(content: string, options?: LoadOptions): PizZip {
    return new PizZip(content, options);
  }

  createDocx(zip: PizZip, options?: ConstructorOptions): Docxtemplater {
    return new Docxtemplater(zip, options);
  }
}

// Использование фабрики
export function getZip(content: string, options?: LoadOptions, factory: Factory = new ConcreteFactory()): PizZip {
  return factory.createZip(content, options);
}

export function getDocx(zip: PizZip, options?: ConstructorOptions, factory: Factory = new ConcreteFactory()): Docxtemplater {
  return factory.createDocx(zip, options);
}
