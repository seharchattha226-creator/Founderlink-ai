import React, { useState } from 'react'
import { Check, X, Plus, Search, Upload, Moon, Sun, Zap } from 'lucide-react'

const DesignSystemPreview = () => {
  const [switchActive, setSwitchActive] = useState(false)
  const [checked, setChecked] = useState(false)
  const [radioValue, setRadioValue] = useState('option1')

  return (
    <div className="min-h-screen bg-bg-primary text-white py-16">
      <div className="container-padded">
        {/* Header */}
        <div className="mb-12">
          <div className="badge-primary mb-4">Design System</div>
          <h1 className="text-h1 mb-4">FounderLink AI</h1>
          <p className="text-body-lg text-text-secondary max-w-2xl">
            Premium design system for a modern, trustworthy, and handcrafted user experience.
          </p>
        </div>

        <div className="divider mb-12" />

        {/* Typography */}
        <section className="mb-16">
          <h2 className="text-h3 mb-8">Typography</h2>
          <div className="card p-8 space-y-8">
            <div>
              <p className="text-caption text-text-tertiary mb-2">Hero / 72px</p>
              <p className="text-hero">Start building the future</p>
            </div>
            <div>
              <p className="text-caption text-text-tertiary mb-2">H1 / 48px</p>
              <p className="text-h1">Launch your startup</p>
            </div>
            <div>
              <p className="text-caption text-text-tertiary mb-2">H2 / 36px</p>
              <p className="text-h2">Validate your ideas</p>
            </div>
            <div>
              <p className="text-caption text-text-tertiary mb-2">H3 / 28px</p>
              <p className="text-h3">AI-powered insights</p>
            </div>
            <div>
              <p className="text-caption text-text-tertiary mb-2">H4 / 20px</p>
              <p className="text-h4">Market research</p>
            </div>
            <div>
              <p className="text-caption text-text-tertiary mb-2">Body Large / 16px</p>
              <p className="text-body-lg text-text-secondary">
                Get comprehensive market analysis and investor-ready materials in minutes.
              </p>
            </div>
            <div>
              <p className="text-caption text-text-tertiary mb-2">Body / 14px</p>
              <p className="text-body text-text-secondary">
                Our AI analyzes market trends and competitive landscapes automatically.
              </p>
            </div>
            <div>
              <p className="text-caption text-text-tertiary mb-2">Small / 12px</p>
              <p className="text-small text-text-tertiary">
                Last updated 2 hours ago
              </p>
            </div>
            <div>
              <p className="text-caption text-text-tertiary mb-2">Caption / 11px</p>
              <p className="text-caption text-text-tertiary">
                VERSION 2.0 • BUILD 421
              </p>
            </div>
          </div>
        </section>

        {/* Colors */}
        <section className="mb-16">
          <h2 className="text-h3 mb-8">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card p-4">
              <div className="w-full h-16 rounded-lg bg-bg-primary mb-3 border border-border" />
              <p className="text-body text-text-primary">Background</p>
              <p className="text-small text-text-tertiary">#0B0B0F</p>
            </div>
            <div className="card p-4">
              <div className="w-full h-16 rounded-lg bg-bg-surface mb-3" />
              <p className="text-body text-text-primary">Surface</p>
              <p className="text-small text-text-tertiary">#141419</p>
            </div>
            <div className="card p-4">
              <div className="w-full h-16 rounded-lg bg-bg-elevated mb-3" />
              <p className="text-body text-text-primary">Elevated</p>
              <p className="text-small text-text-tertiary">#1A1A21</p>
            </div>
            <div className="card p-4">
              <div className="w-full h-16 rounded-lg bg-primary mb-3" />
              <p className="text-body text-text-primary">Primary</p>
              <p className="text-small text-text-tertiary">#00D4FF</p>
            </div>
            <div className="card p-4">
              <div className="w-full h-16 rounded-lg bg-secondary mb-3" />
              <p className="text-body text-text-primary">Secondary</p>
              <p className="text-small text-text-tertiary">#00E5A8</p>
            </div>
            <div className="card p-4">
              <div className="w-full h-16 rounded-lg bg-success mb-3" />
              <p className="text-body text-text-primary">Success</p>
              <p className="text-small text-text-tertiary">#22C55E</p>
            </div>
            <div className="card p-4">
              <div className="w-full h-16 rounded-lg bg-warning mb-3" />
              <p className="text-body text-text-primary">Warning</p>
              <p className="text-small text-text-tertiary">#FACC15</p>
            </div>
            <div className="card p-4">
              <div className="w-full h-16 rounded-lg bg-error mb-3" />
              <p className="text-body text-text-primary">Error</p>
              <p className="text-small text-text-tertiary">#EF4444</p>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-16">
          <h2 className="text-h3 mb-8">Buttons</h2>
          
          <div className="card p-8 mb-6">
            <p className="text-caption text-text-tertiary mb-4">Primary Buttons</p>
            <div className="flex flex-wrap gap-4 items-center">
              <button className="btn-primary">Primary</button>
              <button className="btn-primary btn-sm">Small</button>
              <button className="btn-primary btn-lg">Large</button>
              <button className="btn-primary" disabled>Disabled</button>
            </div>
          </div>

          <div className="card p-8 mb-6">
            <p className="text-caption text-text-tertiary mb-4">Secondary Buttons</p>
            <div className="flex flex-wrap gap-4 items-center">
              <button className="btn-secondary">Secondary</button>
              <button className="btn-outline">Outline</button>
              <button className="btn-ghost">Ghost</button>
              <button className="btn-danger">Danger</button>
            </div>
          </div>

          <div className="card p-8">
            <p className="text-caption text-text-tertiary mb-4">Icon & Floating</p>
            <div className="flex flex-wrap gap-4 items-center">
              <button className="btn-icon">
                <Plus size={20} />
              </button>
              <button className="btn-icon">
                <Search size={20} />
              </button>
              <button className="btn-floating">
                <Zap size={24} />
              </button>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="mb-16">
          <h2 className="text-h3 mb-8">Cards</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card-analytics">
              <h4 className="text-h4 mb-2">Analytics</h4>
              <p className="text-body text-text-secondary">Track your startup metrics in real-time.</p>
              <div className="mt-4 text-3xl font-semibold text-primary">$124K</div>
            </div>

            <div className="card-feature">
              <h4 className="text-h4 mb-2">Features</h4>
              <p className="text-body text-text-secondary">Everything you need to validate and launch.</p>
            </div>

            <div className="card-dashboard">
              <h4 className="text-h4 mb-2">Dashboard</h4>
              <p className="text-body text-text-secondary">Your Founder Command Center.</p>
            </div>

            <div className="card-ai">
              <div className="flex items-center gap-3 mb-3">
                <div className="status-primary" />
                <span className="text-caption">AI ASSISTANT</span>
              </div>
              <p className="text-body">How can I help validate your startup idea today?</p>
            </div>

            <div className="card-notification">
              <div className="flex items-start gap-3">
                <Check className="text-success shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-body font-medium">Validation complete</p>
                  <p className="text-small text-text-tertiary">Your market analysis is ready.</p>
                </div>
              </div>
            </div>

            <div className="card-recommendation">
              <p className="text-small text-text-tertiary mb-2">RECOMMENDATION</p>
              <h4 className="text-h4 mb-2">Focus on SaaS</h4>
              <p className="text-body text-text-secondary">The B2B SaaS market shows strong growth potential.</p>
            </div>
          </div>
        </section>

        {/* Form Elements */}
        <section className="mb-16">
          <h2 className="text-h3 mb-8">Form Elements</h2>
          <div className="card p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="text-small text-text-secondary mb-2 block">Text Input</label>
                  <input type="text" className="input-base" placeholder="Enter your startup name" />
                </div>
                <div>
                  <label className="text-small text-text-secondary mb-2 block">Text Input (Error)</label>
                  <input type="text" className="input-base input-error" value="Invalid input" />
                  <p className="text-small text-error mt-2">Please enter a valid name</p>
                </div>
                <div>
                  <label className="text-small text-text-secondary mb-2 block">Textarea</label>
                  <textarea className="textarea-base" placeholder="Describe your startup idea..." />
                </div>
                <div>
                  <label className="text-small text-text-secondary mb-2 block">Select</label>
                  <select className="select-base">
                    <option>Select an industry</option>
                    <option>Technology</option>
                    <option>Healthcare</option>
                    <option>Finance</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-small text-text-secondary mb-4 block">Checkboxes</label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="checkbox-base" 
                        checked={checked}
                        onChange={(e) => setChecked(e.target.checked)}
                      />
                      <span className="text-body">I agree to the terms</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="checkbox-base" />
                      <span className="text-body">Subscribe to updates</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-small text-text-secondary mb-4 block">Radio Buttons</label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="radio" 
                        className="radio-base" 
                        checked={radioValue === 'option1'}
                        onChange={() => setRadioValue('option1')}
                      />
                      <span className="text-body">Early-stage startup</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="radio" 
                        className="radio-base" 
                        checked={radioValue === 'option2'}
                        onChange={() => setRadioValue('option2')}
                      />
                      <span className="text-body">Growing startup</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-small text-text-secondary mb-4 block">Switch</label>
                  <div 
                    className={`switch-base ${switchActive ? 'active' : ''}`}
                    onClick={() => setSwitchActive(!switchActive)}
                  />
                  <p className="text-small text-text-tertiary mt-2">
                    {switchActive ? 'Dark mode' : 'Light mode'}
                  </p>
                </div>

                <div>
                  <label className="text-small text-text-secondary mb-2 block">File Upload</label>
                  <div className="file-upload-base">
                    <div className="text-center">
                      <Upload className="mx-auto mb-2 text-text-tertiary" size={24} />
                      <p className="text-body text-text-secondary">Click to upload or drag and drop</p>
                      <p className="text-small text-text-tertiary">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Badges, Tags, Status */}
        <section className="mb-16">
          <h2 className="text-h3 mb-8">Badges, Tags & Status</h2>
          
          <div className="card p-8 mb-6">
            <p className="text-caption text-text-tertiary mb-4">Badges</p>
            <div className="flex flex-wrap gap-3">
              <div className="badge-primary">PRIMARY</div>
              <div className="badge-secondary">SECONDARY</div>
              <div className="badge-success">SUCCESS</div>
              <div className="badge-warning">WARNING</div>
              <div className="badge-error">ERROR</div>
            </div>
          </div>

          <div className="card p-8 mb-6">
            <p className="text-caption text-text-tertiary mb-4">Tags</p>
            <div className="flex flex-wrap gap-3">
              <div className="tag">SaaS</div>
              <div className="tag">AI</div>
              <div className="tag">B2B</div>
              <div className="tag">Fintech</div>
              <div className="tag">Healthcare</div>
            </div>
          </div>

          <div className="card p-8">
            <p className="text-caption text-text-tertiary mb-4">Status Indicators</p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <div className="status-primary" />
                <span className="text-body">Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="status-success" />
                <span className="text-body">Online</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="status-warning" />
                <span className="text-body">Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="status-error" />
                <span className="text-body">Error</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="status-muted" />
                <span className="text-body">Inactive</span>
              </div>
            </div>
          </div>
        </section>

        {/* Spacing */}
        <section className="mb-16">
          <h2 className="text-h3 mb-8">Spacing Scale</h2>
          <div className="card p-8">
            <div className="flex items-end gap-2">
              {[2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96].map((size) => (
                <div key={size} className="flex flex-col items-center gap-2">
                  <div 
                    className="bg-primary rounded-sm"
                    style={{ width: `${size}px`, height: `${size}px` }}
                  />
                  <span className="text-small text-text-tertiary">{size}px</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default DesignSystemPreview
