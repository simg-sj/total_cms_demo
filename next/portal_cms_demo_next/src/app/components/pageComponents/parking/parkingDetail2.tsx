"use client"
import React, {useState} from "react";
import {ParkingRowType} from "@/@types/common";
import Button from "@/app/components/common/ui/button";

interface ListProps {
    isEditing: boolean;
    rowData : ParkingRowType;
    onSave: (data: ParkingRowType) => void;
}

const ParkingDetailList = ({isEditing, rowData, onSave }: ListProps) => {
    const [editData, setEditData] = useState<ParkingRowType | ''>(rowData || '');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setEditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onSave(editData);
    }

    //입력필드 타입
    const renderField = (key: string, value: any, type: 'text' | 'select' | 'textarea' = 'text', options?: string[]) => {
        if (!isEditing) {
            return <span>{value || '-'}</span>;
        }
        switch (type) {
            case 'select':
                return (
                    <select
                        name={key}
                        value={editData[key] || ''}
                        onChange={handleChange}
                        className="w-full p-1 border rounded"
                    >
                        <option value="">선택하세요</option>
                        {options?.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                );
            case 'textarea':
                return (
                    <textarea
                        name={key}
                        value={editData[key] || ''}
                        onChange={handleChange}
                        className={"w-full p-1 border rounded h-[100px]"}
                    />
                );
            default:
                return (
                    <input
                        type="text"
                        name={key}
                        value={editData[key] || ''}
                        onChange={handleChange}
                        className="w-full p-1 border rounded"
                    />
                );
        }
    };

    return(
        <>
            <div>
                {isEditing
                    &&
                    <div className='absolute top-[32px] right-[272px] z-10'>
                        <Button color={"blue"} fill={true} height={35} width={100} onClick={handleSave}>
                            저장
                        </Button>
                    </div>
                }
                <div className={'w-full font-semibold text-[17px] mx-2 py-3 flex items-center'}>
                    <div className={'bg-main w-1.5 h-4 mr-2'}></div>
                    주차장 정보
                </div>
                <table className={'colTable text-[15px]'}>
                    <colgroup>
                        <col style={{width: "200px"}}/>
                        <col style={{width: "250px"}}/>
                        <col style={{width: "200px"}}/>
                        <col style={{width: "250px"}}/>
                    </colgroup>
                    <tbody>
                    <tr>
                        <th>주차장명</th>
                        <td colSpan={3}>{renderField('pklName', editData.pklName, 'text')}</td>
                    </tr>
                    <tr>
                        <th>소재지</th>
                        <td colSpan={3}>{renderField('pklAddress', editData.pklAddress, 'text')}</td>

                    </tr>
                    <tr>
                        <th>형태</th>
                        <td colSpan={3}>
                            {renderField('form', editData.form, 'text')}
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div className={'w-full font-semibold text-[17px] mx-2 py-3 flex items-center mt-8'}>
                    <div className={'bg-main w-1.5 h-4 mr-2'}></div>
                    주차장 상세정보
                </div>
                <table className={'colTable text-[15px]'}>
                    <colgroup>
                        <col style={{width: "200px"}}/>
                        <col style={{width: "250px"}}/>
                        <col style={{width: "200px"}}/>
                        <col style={{width: "200px"}}/>
                        <col style={{width: "200px"}}/>
                        <col style={{width: "200px"}}/>
                        <col style={{width: "200px"}}/>
                    </colgroup>
                    <tbody>
                    <tr>
                        <th>면수</th>
                        <td colSpan={3}>{renderField('faceCount', editData.faceCount, 'text')}</td>
                    </tr>
                    <tr>
                        <th>옥외</th>
                        <td colSpan={3}>{renderField('outdoor', editData.outdoor, 'text')}</td>
                    </tr>
                    <tr>
                        <th>옥내</th>
                        <td colSpan={3}>{renderField('indoor', editData.indoor, 'text')}</td>
                    </tr>
                    <tr>
                        <th>기계식(면)</th>
                        <td colSpan={3}>{renderField('mechanical', editData.mechanical, 'text')}</td>
                    </tr>
                    <tr>
                        <th>카리프트(대)</th>
                        <td colSpan={3}>{renderField('carLift', editData.carLift, 'text')}</td>
                    </tr>
                    <tr>
                        <th>세부 내역</th>
                        <td colSpan={3}>{renderField('detailHistory', editData.detailHistory, 'text')}</td>
                    </tr>
                    <tr>
                        <th>공동피보험자</th>
                        <td colSpan={3}>{renderField('memo', editData.memo, 'textarea')}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
        ;
}

export default ParkingDetailList