import { router, useForm } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, FileText, Image as ImageIcon, X } from 'lucide-react';
import { useState } from 'react';
import { SerializedEditorState, SerializedLexicalNode } from "lexical";

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TextEditor from '@/components/manual/text-editor';

interface CreateEventModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type EventForm = {
    nome: string;
    data_inicio: string;
    data_fim: string;
    image: File | null;
    seac: boolean;
    seget: boolean;
};

export default function CreateEventModal({ isOpen, onClose }: CreateEventModalProps) {
    const [dragActive, setDragActive] = useState(false);
    const { data, setData, processing, errors, reset } = useForm<EventForm>({
        nome: '',
        data_inicio: '',
        data_fim: '',
        image: null,
        seac: false,
        seget: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!data.seac && !data.seget) {
            return;
        }

        const formData = new FormData();
        formData.append('nome', data.nome);
        formData.append('data_inicio', data.data_inicio);
        formData.append('data_fim', data.data_fim);
        formData.append('seac', data.seac ? '1' : '0');
        formData.append('seget', data.seget ? '1' : '0');
        formData.append('descricao', ' ');  
        if (data.image) {
            formData.append('image', data.image);
            console.log('Image file:', data.image);
            console.log('Image name:', data.image.name);
            console.log('Image size:', data.image.size);
        } else {
            console.error('No image selected');
        }

        // Debug FormData
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
99
        router.post(route('eventos.store'), formData, {
            onSuccess: () => {
                console.log('Success!');
                reset();
                onClose();
            },
            onError: (errors) => {
                console.error('Errors:', errors);
            }
        });
    };

    const handleImageUpload = (file: File) => {
        setData('image', file);
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleImageUpload(e.dataTransfer.files[0]);
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleImageUpload(e.target.files[0]);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    
                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Novo Evento
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Nome do Evento */}
                                <div className="space-y-2">
                                    <Label htmlFor="nome" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Nome do Evento
                                    </Label>
                                    <div className="relative">
                                        <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="nome"
                                            type="text"
                                            required
                                            value={data.nome}
                                            onChange={(e) => setData('nome', e.target.value)}
                                            placeholder="Digite o nome do evento"
                                            className="pl-10"
                                        />
                                    </div>
                                    <InputError message={errors.nome} />
                                </div>

                                {/* Datas */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="data_inicio" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Data de Início
                                        </Label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="data_inicio"
                                                type="date"
                                                required
                                                value={data.data_inicio}
                                                onChange={(e) => setData('data_inicio', e.target.value)}
                                                className="pl-10"
                                            />
                                        </div>
                                        <InputError message={errors.data_inicio} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="data_fim" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Data de Fim
                                        </Label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="data_fim"
                                                type="date"
                                                required
                                                value={data.data_fim}
                                                onChange={(e) => setData('data_fim', e.target.value)}
                                                className="pl-10"
                                            />
                                        </div>
                                        <InputError message={errors.data_fim} />
                                    </div>
                                </div>

                                {/* Upload de Imagem */}
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Imagem do Evento
                                    </Label>
                                    <div
                                        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
                                            dragActive
                                                ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                                        }`}
                                        onDragEnter={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDragOver={handleDrag}
                                        onDrop={handleDrop}
                                    >
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileInput}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <div className="text-center">
                                            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                            <div className="mt-4">
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {data.image ? (
                                                        <span className="font-medium text-blue-600 dark:text-blue-400">
                                                            {data.image.name}
                                                        </span>
                                                    ) : (
                                                        <>
                                                            <span className="font-medium text-blue-600 dark:text-blue-400">
                                                                Clique para enviar
                                                            </span>
                                                            {' '}ou arraste e solte
                                                        </>
                                                    )}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    PNG, JPG, JPEG até 10MB
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <InputError message={errors.image} />
                                </div>


                                {/* Tipo de Evento */}
                                <div className="space-y-3">
                                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Tipo de Evento
                                    </Label>
                                    <div className="flex flex-col space-y-3">
                                        <div className="flex items-center space-x-3">
                                            <Checkbox
                                                id="seac"
                                                checked={data.seac}
                                                onClick={() => setData('seac', !data.seac)}
                                            />
                                            <Label htmlFor="seac" className="text-sm text-gray-700 dark:text-gray-300">
                                                SEAC (Semana Acadêmica de Ciências)
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Checkbox
                                                id="seget"
                                                checked={data.seget}
                                                onClick={() => setData('seget', !data.seget)}
                                            />
                                            <Label htmlFor="seget" className="text-sm text-gray-700 dark:text-gray-300">
                                                SEGET (Seminário de Gestão e Tecnologia)
                                            </Label>
                                        </div>
                                    </div>
                                    {!data.seac && !data.seget && (
                                        <p className="text-sm text-red-600 dark:text-red-400">
                                            Selecione pelo menos um tipo de evento
                                        </p>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={onClose}
                                        disabled={processing}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing || (!data.seac && !data.seget)}
                                        className="bg-blue-600 hover:bg-blue-700"
                                    >
                                        {processing ? 'Criando...' : 'Criar Evento'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}