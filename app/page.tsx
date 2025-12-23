"use client"
import React, { useState } from 'react';
import { User, Briefcase, Code, GraduationCap, Award, FileText, Download, Plus, Trash2 } from 'lucide-react';

export default function DossierCompetences() {
  const [profile, setProfile] = useState({
    nom: '',
    prenom: '',
    titre: '',
    experience: '',
    disponibilite: '',
    tjm: '',
    localisation: ''
  });

  interface Mission {
    id: number;
    client: string;
    projet: string;
    periode: string;
    duree: string;
    role: string;
    contexte: string;
    missions: string;
    technologies: string;
    environnement: string;
  }

  interface Formation {
    id: number;
    diplome: string;
    etablissement: string;
    annee: string;
  }

  interface Certification {
    id: number;
    nom: string;
    organisme: string;
    annee: string;
  }

  const [missions, setMissions] = useState<Mission[]>([]);
  const [competences, setCompetences] = useState({
    langages: [] as string[],
    frameworks: [] as string[],
    outils: [] as string[],
    methodologies: [] as string[]
  });

  const [formations, setFormations] = useState<Formation[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);

  const addMission = () => {
    setMissions([...missions, {
      id: Date.now(),
      client: '',
      projet: '',
      periode: '',
      duree: '',
      role: '',
      contexte: '',
      missions: '',
      technologies: '',
      environnement: ''
    }]);
  };

  const updateMission = (id: number, field: string, value: string) => {
    setMissions(missions.map(m => m.id === id ? {...m, [field]: value} : m));
  };

  const deleteMission = (id: number) => {
    setMissions(missions.filter(m => m.id !== id));
  };

  const addFormation = () => {
    setFormations([...formations, {
      id: Date.now(),
      diplome: '',
      etablissement: '',
      annee: ''
    }]);
  };

  const addCertification = () => {
    setCertifications([...certifications, {
      id: Date.now(),
      nom: '',
      organisme: '',
      annee: ''
    }]);
  };

  const exportPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 print:bg-blue-700">
          <div className="flex items-center justify-between print:block">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dossier de Compétences</h1>
              <p className="text-blue-100">Consultant IT - Régie & Assistance Technique</p>
            </div>
            <button
              onClick={exportPDF}
              className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition print:hidden"
            >
              <Download size={20} />
              Exporter PDF
            </button>
          </div>
        </div>

        {/* Profil */}
        <section className="p-8 border-b">
          <div className="flex items-center gap-3 mb-6">
            <User className="text-blue-600" size={28} />
            <h2 className="text-2xl font-bold text-gray-800">Profil</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nom"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={profile.nom}
              onChange={(e) => setProfile({...profile, nom: e.target.value})}
            />
            <input
              type="text"
              placeholder="Prénom"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={profile.prenom}
              onChange={(e) => setProfile({...profile, prenom: e.target.value})}
            />
            <input
              type="text"
              placeholder="Titre du poste (ex: Développeur Full Stack Senior)"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent md:col-span-2"
              value={profile.titre}
              onChange={(e) => setProfile({...profile, titre: e.target.value})}
            />
            <input
              type="text"
              placeholder="Années d'expérience"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={profile.experience}
              onChange={(e) => setProfile({...profile, experience: e.target.value})}
            />
            <input
              type="text"
              placeholder="Disponibilité"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={profile.disponibilite}
              onChange={(e) => setProfile({...profile, disponibilite: e.target.value})}
            />
            <input
              type="text"
              placeholder="TJM (optionnel)"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={profile.tjm}
              onChange={(e) => setProfile({...profile, tjm: e.target.value})}
            />
            <input
              type="text"
              placeholder="Localisation"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={profile.localisation}
              onChange={(e) => setProfile({...profile, localisation: e.target.value})}
            />
          </div>
        </section>

        {/* Compétences Techniques */}
        <section className="p-8 border-b">
          <div className="flex items-center gap-3 mb-6">
            <Code className="text-blue-600" size={28} />
            <h2 className="text-2xl font-bold text-gray-800">Compétences Techniques</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Langages de programmation</label>
              <input
                type="text"
                placeholder="Ex: Java, Python, JavaScript, C#..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={competences.langages.join(', ')}
                onChange={(e) => setCompetences({...competences, langages: e.target.value.split(',').map(s => s.trim())})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Frameworks & Librairies</label>
              <input
                type="text"
                placeholder="Ex: React, Angular, Spring Boot, Django..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={competences.frameworks.join(', ')}
                onChange={(e) => setCompetences({...competences, frameworks: e.target.value.split(',').map(s => s.trim())})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Outils & Technologies</label>
              <input
                type="text"
                placeholder="Ex: Docker, Kubernetes, Jenkins, Git, AWS..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={competences.outils.join(', ')}
                onChange={(e) => setCompetences({...competences, outils: e.target.value.split(',').map(s => s.trim())})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Méthodologies</label>
              <input
                type="text"
                placeholder="Ex: Agile/Scrum, DevOps, CI/CD, TDD..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={competences.methodologies.join(', ')}
                onChange={(e) => setCompetences({...competences, methodologies: e.target.value.split(',').map(s => s.trim())})}
              />
            </div>
          </div>
        </section>

        {/* Expériences Professionnelles */}
        <section className="p-8 border-b">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="text-blue-600" size={28} />
            <h2 className="text-2xl font-bold text-gray-800">Expériences Professionnelles</h2>
          </div>
          
          <button
            onClick={addMission}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mb-6 print:hidden"
          >
            <Plus size={20} />
            Ajouter une mission
          </button>

          <div className="space-y-6">
            {missions.map((mission) => (
              <div key={mission.id} className="bg-gray-50 p-6 rounded-lg relative border border-gray-200">
                <button
                  onClick={() => deleteMission(mission.id)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700 print:hidden"
                >
                  <Trash2 size={20} />
                </button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Client / Entreprise"
                    className="border border-gray-300 rounded-lg px-4 py-2 bg-white"
                    value={mission.client}
                    onChange={(e) => updateMission(mission.id, 'client', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Nom du projet"
                    className="border border-gray-300 rounded-lg px-4 py-2 bg-white"
                    value={mission.projet}
                    onChange={(e) => updateMission(mission.id, 'projet', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Période (ex: Jan 2023 - Déc 2023)"
                    className="border border-gray-300 rounded-lg px-4 py-2 bg-white"
                    value={mission.periode}
                    onChange={(e) => updateMission(mission.id, 'periode', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Durée (ex: 12 mois)"
                    className="border border-gray-300 rounded-lg px-4 py-2 bg-white"
                    value={mission.duree}
                    onChange={(e) => updateMission(mission.id, 'duree', e.target.value)}
                  />
                </div>
                
                <input
                  type="text"
                  placeholder="Rôle / Fonction"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 bg-white"
                  value={mission.role}
                  onChange={(e) => updateMission(mission.id, 'role', e.target.value)}
                />
                
                <textarea
                  placeholder="Contexte du projet"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 bg-white"
                  rows={2}
                  value={mission.contexte}
                  onChange={(e) => updateMission(mission.id, 'contexte', e.target.value)}
                />
                
                <textarea
                  placeholder="Missions réalisées (détails des tâches et responsabilités)"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 bg-white"
                  rows={4}
                  value={mission.missions}
                  onChange={(e) => updateMission(mission.id, 'missions', e.target.value)}
                />
                
                <input
                  type="text"
                  placeholder="Technologies utilisées"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 bg-white"
                  value={mission.technologies}
                  onChange={(e) => updateMission(mission.id, 'technologies', e.target.value)}
                />
                
                <input
                  type="text"
                  placeholder="Environnement technique"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white"
                  value={mission.environnement}
                  onChange={(e) => updateMission(mission.id, 'environnement', e.target.value)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Formation */}
        <section className="p-8 border-b">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="text-blue-600" size={28} />
            <h2 className="text-2xl font-bold text-gray-800">Formation</h2>
          </div>
          
          <button
            onClick={addFormation}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mb-4 print:hidden"
          >
            <Plus size={20} />
            Ajouter une formation
          </button>

          <div className="space-y-3">
            {formations.map((formation) => (
              <div key={formation.id} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Diplôme"
                  className="border border-gray-300 rounded-lg px-4 py-2"
                  value={formation.diplome}
                  onChange={(e) => setFormations(formations.map(f => f.id === formation.id ? {...f, diplome: e.target.value} : f))}
                />
                <input
                  type="text"
                  placeholder="Établissement"
                  className="border border-gray-300 rounded-lg px-4 py-2"
                  value={formation.etablissement}
                  onChange={(e) => setFormations(formations.map(f => f.id === formation.id ? {...f, etablissement: e.target.value} : f))}
                />
                <input
                  type="text"
                  placeholder="Année"
                  className="border border-gray-300 rounded-lg px-4 py-2"
                  value={formation.annee}
                  onChange={(e) => setFormations(formations.map(f => f.id === formation.id ? {...f, annee: e.target.value} : f))}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <Award className="text-blue-600" size={28} />
            <h2 className="text-2xl font-bold text-gray-800">Certifications</h2>
          </div>
          
          <button
            onClick={addCertification}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mb-4 print:hidden"
          >
            <Plus size={20} />
            Ajouter une certification
          </button>

          <div className="space-y-3">
            {certifications.map((cert) => (
              <div key={cert.id} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Nom de la certification"
                  className="border border-gray-300 rounded-lg px-4 py-2"
                  value={cert.nom}
                  onChange={(e) => setCertifications(certifications.map(c => c.id === cert.id ? {...c, nom: e.target.value} : c))}
                />
                <input
                  type="text"
                  placeholder="Organisme"
                  className="border border-gray-300 rounded-lg px-4 py-2"
                  value={cert.organisme}
                  onChange={(e) => setCertifications(certifications.map(c => c.id === cert.id ? {...c, organisme: e.target.value} : c))}
                />
                <input
                  type="text"
                  placeholder="Année"
                  className="border border-gray-300 rounded-lg px-4 py-2"
                  value={cert.annee}
                  onChange={(e) => setCertifications(certifications.map(c => c.id === cert.id ? {...c, annee: e.target.value} : c))}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="bg-gray-100 p-6 text-center text-sm text-gray-600">
          <p>Document confidentiel - Ne pas diffuser sans autorisation</p>
        </div>
      </div>

      <style jsx>{`
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print\\:hidden { display: none !important; }
          .print\\:block { display: block !important; }
          .print\\:bg-blue-700 { background-color: #1d4ed8 !important; }
        }
      `}</style>
    </div>
  );
}