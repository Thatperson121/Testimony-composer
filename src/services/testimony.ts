import { Testimony } from '../types/testimony';

// For now, we'll use localStorage. Later we can switch to a backend database
export class TestimonyService {
  private STORAGE_KEY = 'testimonies';

  private getStoredTestimonies(): Testimony[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveTestimonies(testimonies: Testimony[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(testimonies));
  }

  createTestimony(title: string, content: string, category: string = 'Uncategorized', tags: string[] = []): Testimony {
    const testimonies = this.getStoredTestimonies();
    
    const newTestimony: Testimony = {
      id: crypto.randomUUID(),
      title,
      content,
      category,
      tags,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    testimonies.push(newTestimony);
    this.saveTestimonies(testimonies);
    
    return newTestimony;
  }

  getAllTestimonies(): Testimony[] {
    return this.getStoredTestimonies();
  }

  getTestimonyById(id: string): Testimony | undefined {
    return this.getStoredTestimonies().find(t => t.id === id);
  }

  updateTestimony(id: string, updates: Partial<Testimony>): Testimony | null {
    const testimonies = this.getStoredTestimonies();
    const index = testimonies.findIndex(t => t.id === id);
    
    if (index === -1) return null;

    const updatedTestimony = {
      ...testimonies[index],
      ...updates,
      updatedAt: new Date()
    };

    testimonies[index] = updatedTestimony;
    this.saveTestimonies(testimonies);

    return updatedTestimony;
  }

  deleteTestimony(id: string): boolean {
    const testimonies = this.getStoredTestimonies();
    const filteredTestimonies = testimonies.filter(t => t.id !== id);
    
    if (filteredTestimonies.length === testimonies.length) {
      return false;
    }

    this.saveTestimonies(filteredTestimonies);
    return true;
  }

  updateTags(id: string, tags: string[]): Testimony | null {
    return this.updateTestimony(id, { tags });
  }

  updateCategory(id: string, category: string): Testimony | null {
    return this.updateTestimony(id, { category });
  }

  getAllCategories(): string[] {
    const testimonies = this.getStoredTestimonies();
    return Array.from(new Set(testimonies.map(t => t.category)));
  }

  getAllTags(): string[] {
    const testimonies = this.getStoredTestimonies();
    return Array.from(new Set(testimonies.flatMap(t => t.tags)));
  }
}

export const testimonyService = new TestimonyService(); 